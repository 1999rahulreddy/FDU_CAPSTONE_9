import sys

# Check if the correct number of command-line arguments is provided
if len(sys.argv) != 4:
    print("Usage: python sum_three_numbers.py <num1> <num2> <num3>")
else:
    try:
        # Extract the three numbers from command-line arguments
        num1 = int(sys.argv[1])
        num2 = int(sys.argv[2])
        num3 = int(sys.argv[3])

        # Calculate the sum
        sum_of_numbers = num1 + num2 + num3

        # Print the sum
        print(f"{sum_of_numbers}")
    except ValueError:
        print("Invalid input. Please provide valid integers.")
