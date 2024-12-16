import re

# variables
regex = "^p=(\d+),(\d+) v=(-?\d+),(-?\d+)$"
max_x = 101
max_y = 103

# prep data
f = open('input.txt', 'r')
data = f.read()
f.close()
data = data.splitlines()
robots = []
for s in data:
    robots += re.findall(regex, s)
robots_int = []
for r in robots:
    robots_int.append((int(r[0]), int(r[1]), int(r[2]), int(r[3])))
print(robots_int)

# functions
def move_robot(robot, times):
    x = (robot[0] + (robot[2] * times)) % max_x
    y = (robot[1] + (robot[3] * times)) % max_y
    return (x, y, robot[2], robot[3])

def pretty_print(robots):
    grid = [['.' for _ in range(max_x)] for _ in range(max_y)]
    for robot in robots:
        x, y = robot[0], robot[1]
        if grid[y][x] == '.':
            grid[y][x] = '1'
        else:
            grid[y][x] = str(int(grid[y][x]) + 1)
    for row in grid:
        print(''.join(row))

def count_quadrants(robots):
    a = 0 # top left
    b = 0 # top right
    c = 0 # bottom left
    d = 0 # bottom right
    mid_x = max_x // 2
    mid_y = max_y // 2
    for robot in robots:
        x, y = robot[0], robot[1]
        if x == mid_x or y == mid_y:
            continue
        if x < mid_x and y < mid_y:
            a += 1
        elif x >= mid_x and y < mid_y:
            b += 1
        elif x < mid_x and y >= mid_y:
            c += 1
        elif x >= mid_x and y >= mid_y:
            d += 1
    return a, b, c, d

# part 1
# robots_positions = [move_robot(robot, 100) for robot in robots_int]
# pretty_print(robots_positions)
# q = count_quadrants(robots_positions)
# res = q[0] * q[1] * q[2] * q[3]
# print(res)