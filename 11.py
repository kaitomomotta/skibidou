from functools import cache

f = open('input.txt', 'r')
data = f.read()
f.close()

data = data.split(" ")
rocks=[]

for elt in data:
    rocks.append(int(elt))

@cache
def do_x_rounds(rounds, rock):
    if (rounds == 0):
        return 1
    if rock == 0:
        return do_x_rounds(rounds - 1, 1)
    elif len(str(rock)) % 2 == 0:
        rock_str = str(rock)
        left = int(rock_str[:len(rock_str) // 2])
        right = int(rock_str[len(rock_str) // 2:])
        return do_x_rounds(rounds - 1, left) + do_x_rounds(rounds - 1, right)
    else:
        return do_x_rounds(rounds - 1, rock * 2024)

def exec(rounds, rocks):
    res = 0
    for rock in rocks:
        res += do_x_rounds(rounds, rock)
    return res

print(exec(75, rocks))
