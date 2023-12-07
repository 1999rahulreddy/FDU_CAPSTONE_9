import os
import subprocess
from .models import *
from datetime import datetime

def data(uploaded_file, user, file_name, file_location, description, language, course_id, assignment_id):
    try:
        # Save the uploaded file to the specified location
        with open(file_location, 'wb+') as file:
            for chunk in uploaded_file.chunks():
                file.write(chunk)

        user_file = Code(student=user, code_file=file_location, description=description, language=language,
                         course_id=course_id, assignment_no=assignment_id, due_date="2022-09-01 00:30:00")
        user_file.save()

        # Retrieve test cases and expected output from the database
        test_cases_query = TestCase.objects.filter(course_id=course_id, assignment_no=assignment_id)
        test_cases = [case.input_data.split() for case in test_cases_query]
        expected_output = [case.output_data for case in test_cases_query]
        print(expected_output)

        if language == 'python':
            results = []
            ou = []
            for idx, case in enumerate(test_cases):
                input_data = ' '.join(map(str, case))
                result = subprocess.run(['python', file_location] + [str(arg) for arg in case], stdout=subprocess.PIPE, text=True)
                output = result.stdout.strip()
                ou.append(output)

                # Check if the output matches the expected output
                if output == expected_output[idx]:
                    results.append(f'Test case {idx + 1} Passed\n')
                else:
                    results.append(f'Test case {idx + 1} Failed\n')

            #pass_count = results.count("Passed")
            pass_count = sum("Passed" in r for r in results)
            total_count = len(test_cases)
            score = (pass_count / total_count) * 100 if total_count > 0 else 0

            update_score(course_id, assignment_id, user, score)

            result = {
                "test_cases": [f"Testcase{idx + 1}: {' '.join(map(str, case))}" for idx, case in enumerate(test_cases)],
                "results": results,
                "expected output": expected_output,
                "Real output": ou,
                "score": score
            }

        elif language == 'c':
            # Compile the C code (assuming it's a single .c file)
            compile_command = ['gcc', file_location, '-o', f'{file_location}_compiled_file']
            compile_result = subprocess.run(compile_command, capture_output=True, text=True)

            if compile_result.returncode == 0:
                results = []
                ou = []
                for idx, case in enumerate(test_cases):
                    input_data = ' '.join(map(str, case))
                    execute_command = [f'{file_location}_compiled_file']

                    execution_result = subprocess.run(execute_command + [str(arg) for arg in case], stdout=subprocess.PIPE, text=True)
                    output = execution_result.stdout.strip()
                    ou.append(output)

                    # Check if the output matches the expected output
                    try:
                        if int(output) == expected_output[idx]:
                            results.append(f'Test case {idx + 1} Passed\n')
                        else:
                            results.append(f'Test case {idx + 1} Failed\n')
                    except ValueError as e:
                        results.append(f'Test case {idx + 1} Failed: {str(e)}\n')

                #pass_count = results.count("Passed")
                pass_count = sum("Passed" in r for r in results)
                total_count = len(test_cases)
                score = (pass_count / total_count) * 100 if total_count > 0 else 0

                update_score(course_id, assignment_id, user, score)

                result = {
                    "test_cases": [f"Testcase{idx + 1}: {' '.join(map(str, case))}" for idx, case in enumerate(test_cases)],
                    "results": results,
                    "expected output": expected_output,
                    "Real output": ou,
                    "score": score
                }

                # Delete the file after compilation and getting the final result
                # os.remove(f'{file_location}_compiled_file')

            else:
                # Compilation failed
                result = {'error': 'Compilation failed'}

        else:
            result = {'error': 'Invalid language'}

        print(result)
        return result

    except TestCase.DoesNotExist:
        return {'error': 'Test cases not found for the specified assignment'}

    except ValueError as e:
        return {'error': str(e)}

    except Exception as e:
        return {'error': str(e)}

def update_score(c_id, a_no, s_id, grade):
    """Update the score of an assignment"""
    Gr = Grades(student=s_id, course_id=c_id, assignment_no=a_no, grade=grade, submission_date=datetime.now())
    Gr.save()
