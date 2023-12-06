import os, subprocess, sys
from .models import *
def data(uploaded_file, user, file_name, file_location, description, language):
    #user_file = UserFile(user=user, file_name=file_name, file_location=file_location, description=description)
    #only used hard coded values for assignment no., due_date`  ` and course id need to change these
    user_file = Code(student=user, code_file=file_location, description=description, language = language, course_id="1", assignment_no = "1", due_date="2022-09-01 00:30:00")
    print(file_location)
    user_file.save()
    #test_cases = [[1, 2, 3], [3, 2, 1], [3, 4, 0]]
    test_cases = [[123,322],[344,233]]
    #expected_output = [6, 6, 6]
    expected_output = [f'123 is palindrome: False\n322 is palindrome: False', f"344 is palindrome: False\n233 is palindrome: False"]

    # Save the uploaded file to the specified location
    with open(file_location, 'wb+') as file:
        for chunk in uploaded_file.chunks():
            file.write(chunk)

    if language == 'python':

        results = []
        ou = []
        for idx, case in enumerate(test_cases):
            input_data = ' '.join(map(str, case))
            #result = subprocess.run(['/Users/rahul/miniconda3/envs/cap3_8/bin/python', file_location], input='1 2 3', capture_output=True, text=True, shell=True)
            #result = subprocess.run(['python', file_location, '1','2','3'], stdout=subprocess.PIPE, text=True)
            result = subprocess.run(['python', file_location] + [str(arg) for arg in case], stdout=subprocess.PIPE, text=True)        
            output = result.stdout.strip()
            #print("\n\n\n"+output)
            ou.append(output)

            # Check if the output matches the expected output
            if (output) == expected_output[idx]:
                results.append(f'Test case {idx+1} Passed\n')
            else:
                results.append(f'Test case {idx+1} Failed\n')

        #pass_count = results.count("Passed")
        pass_count = sum("Passed" in result for result in results)
        total_count = len(test_cases)
        score = (pass_count / total_count) * 100 if total_count > 0 else 0

        result = {
            "test_cases": [f"Testcase{idx+1}: {' '.join(map(str, case))}" for idx, case in enumerate(test_cases)],
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
            # Successfully compiled, execute the compiled binary

            results = []
            ou = []
            for idx, case in enumerate(test_cases):
                input_data = ' '.join(map(str, case))
                execute_command = [f'{file_location}_compiled_file']

                execution_result = subprocess.run(execute_command + [str(arg) for arg in case], stdout=subprocess.PIPE, text=True)
                output = execution_result.stdout.strip()
                #print("\n\n\n"+output)
                ou.append(output)

                # Check if the output matches the expected output
                if int(output) == expected_output[idx]:
                    results.append(f'Test case {idx+1} Passed\n')
                else:
                    results.append(f'Test case {idx+1} Failed\n')
 
            pass_count = results.count("pass")
            total_count = len(test_cases)
            score = (pass_count / total_count) * 100 if total_count > 0 else 0

            result = {
                "test_cases": [f"Testcase{idx+1}: {' '.join(map(str, case))}" for idx, case in enumerate(test_cases)],
                "results": results,
                "expected output": expected_output,
                "Real output": ou,
                "score": score
            }

            # Delete the file after compilation and getting the final result
            #os.remove(f'{file_location}_compiled_file')

        else:
            # Compilation failed
            result = {'error': 'Compilation failed'}
    else:
        result = {'error': 'Invalid language'}

    print(result)

    return result