def is_palindrome(num):
    if num < 0:
        return False

    if str(num) == str(num)[::-1]:
        return True
    else:
        return False


num = 121
num1 = 123
print(is_palindrome(num))
print(is_palindrome(num1))
