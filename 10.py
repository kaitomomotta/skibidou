f = open('input.txt', 'r')
data = f.read()
f.close()

map = []

data = data.splitlines()
for line in data:
    map.append(list(line))

def propagate(x, y):
    if x < 0 or y < 0 or x >= len(map[0]) or y >= len(map):
        return 0
    value = int(map[y][x])
    if value == 9:
        return 1
    res = 0
    if x > 0 and int(map[y][x - 1]) == value + 1:
        res += propagate(x - 1, y)
    if x < len(map[0]) - 1 and int(map[y][x + 1]) == value + 1:
        res += propagate(x + 1, y)
    if y > 0 and int(map[y - 1][x]) == value + 1:
        res += propagate(x, y - 1)
    if y < len(map) - 1 and int(map[y + 1][x]) == value + 1:
        res += propagate(x, y + 1)
    return res

result = 0
for x in range(len(map[0])):
    for y in range(len(map)):
        if map[y][x] == '0':
            print("trailhead found at y="+str(y)+", x = "+str(x))
            result +=propagate(x, y)

print(result)