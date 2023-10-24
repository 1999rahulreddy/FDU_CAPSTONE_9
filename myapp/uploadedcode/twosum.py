def twoSum(nums, target):
    ans = []
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                ans.append(i)
                ans.append(j)
                return ans
    return ans


def twosumHash(nums, target):
    prevMap = {}

    for i in range(len(nums)):
        diff = target - nums[i]
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[nums[i]] = i

    return []


nums = [2, 7, 11, 15]
target = 9
print(twoSum(nums, target))
print(twosumHash(nums, target))
