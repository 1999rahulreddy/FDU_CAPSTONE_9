import os, subprocess, sys
from .models import *
def data(uploaded_file, user, file_name, file_location, description, language):
    user_file = UserFile(user=user, file_name=file_name, file_location=file_location, description=description)
    user_file.save()
    test_cases = [[1, 2, 3], [3, 2, 1], [3, 4, 0]]
    expected_output = [6, 6, 6]

    # Save the uploaded file to the specified location
    with open(file_location, 'wb+') as file:
        for chunk in uploaded_file.chunks():
            file.write(chunk)

    if language == 'python':

        results = []
        for idx, case in enumerate(test_cases):
            input_data = ' '.join(map(str, case))
            #result = subprocess.run(['/Users/rahul/miniconda3/envs/cap3_8/bin/python', file_location], input='1 2 3', capture_output=True, text=True, shell=True)
            #result = subprocess.run(['python', file_location, '1','2','3'], stdout=subprocess.PIPE, text=True)
            result = subprocess.run(['python', file_location] + [str(arg) for arg in case], stdout=subprocess.PIPE, text=True)        
            output = result.stdout.strip()

            # Check if the output matches the expected output
            if int(output) == expected_output[idx]:
                results.append("pass")
            else:
                results.append("fail")

        pass_count = results.count("pass")
        total_count = len(test_cases)
        score = (pass_count / total_count) * 100 if total_count > 0 else 0

        result = {
            "test_cases": [f"Testcase{idx+1}: {' '.join(map(str, case))}" for idx, case in enumerate(test_cases)],
            "results": results,
            "score": score
        }

    elif language == 'c':
        # Compile the C code (assuming it's a single .c file)
        compile_command = ['gcc', file_location, '-o', f'{file_location}_compiled_file']
        compile_result = subprocess.run(compile_command, capture_output=True, text=True)

        if compile_result.returncode == 0:
            # Successfully compiled, execute the compiled binary

            results = []
            for idx, case in enumerate(test_cases):
                input_data = ' '.join(map(str, case))
                execute_command = [f'{file_location}_compiled_file']

                execution_result = subprocess.run(execute_command + [str(arg) for arg in case], stdout=subprocess.PIPE, text=True)
                output = execution_result.stdout.strip()

                # Check if the output matches the expected output
                if int(output) == expected_output[idx]:
                    results.append("pass")
                else:
                    results.append("fail")

            pass_count = results.count("pass")
            total_count = len(test_cases)
            score = (pass_count / total_count) * 100 if total_count > 0 else 0

            result = {
                "test_cases": [f"Testcase{idx+1}: {' '.join(map(str, case))}" for idx, case in enumerate(test_cases)],
                "results": results,
                "score": score
            }

            # Delete the file after compilation and getting the final result
            os.remove(f'{file_location}_compiled_file')

        else:
            # Compilation failed
            result = {'error': 'Compilation failed'}
    else:
        result = {'error': 'Invalid language'}

    print(result)

    return result