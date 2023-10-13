from typing import List

def signFunc(product:int):
    if product > 0:
        return 1
    elif product == 0:
        return 0
    else:
        return -1
    
def arraySign(nums:List[int])->int:
    product = 1
    for num in nums:
        product *= num

    return signFunc(product)

nums = [-1,1,-1,1,-1]
print(arraySign(nums))
