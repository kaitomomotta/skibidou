import re

f = open('input.txt', 'r')
data = f.read()
f.close()

regex = "(?:mul\(([0-9]{1,3}),([0-9]{1,3})\))|(do\(\))|(don't\(\))"
found = re.findall(regex, data)
print(found)

res = 0
is_enabled = True
for (a, b, c, d) in found:
    if c == "do()":
        is_enabled = True
        continue
    if d == "don't()":
        is_enabled = False
        continue
    if is_enabled:
        res += int(a) * int(b)
print(res)