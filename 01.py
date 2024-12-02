import numpy as np

def dist(a, b):
    return abs(a - b)


def build_lists():
    l1 = []
    l2 = []
    f = open('input', 'r')
    data = f.read().splitlines()
    for line in data:
        numbers = line.split(" ")
        l1.append(numbers[0])
        l2.append(numbers[-1])
    f.close()
    return (l1, l2)

(l1, l2) = build_lists()
# l1.sort()
# l2.sort()
print(l1)
print(l2)

# res = []
# for i in range(len(l1)):
#     res.append(dist(int(l1[i]), int(l2[i])))

similarity_score = 0

for i in range(len(l1)):
    similarity_score += int(l1[i]) * l2.count(l1[i])

# print(res)
# print(sum(res))
print(similarity_score)