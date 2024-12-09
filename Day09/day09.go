package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func getDiskData(lines []string) []string {
	diskBlocks := []string{}

	for i, id := 0, 0; i < len(lines); i++ {
		amount, _ := strconv.Atoi(lines[i])
		if id%2 == 0 {
			result := make([]string, amount)
			for i := 0; i < amount; i++ {
				result[i] = strconv.FormatFloat(float64(id)/2, 'f', -1, 64)
			}

			diskBlocks = append(diskBlocks, result...)
		} else {
			dots := strings.Repeat(".", amount)
			diskBlocks = append(diskBlocks, strings.Split(dots, "")...)
		}

		id++
	}

	return diskBlocks
}

func checkSum(diskBlocks []string) int {
	sum := 0
	for i, id := range diskBlocks {
		if id != "." {
			intD, _ := strconv.Atoi(id)
			sum += intD * i
		}
	}

	return sum
}

func Part1(diskBlocks []string) int {
	for i, j := 0, len(diskBlocks)-1; i < len(diskBlocks); i++ {
		if i > j {
			break
		}

		if diskBlocks[i] == "." {
			temp := diskBlocks[i]
			diskBlocks[i] = diskBlocks[j]
			diskBlocks[j] = temp
			j--
			for j >= 0 && diskBlocks[j] == "." {
				j--
			}
		}
	}

	return checkSum(diskBlocks)
}

func Part2(diskBlocks []string) int {
	for i := len(diskBlocks) - 1; i >= 0; i-- {
		tar := diskBlocks[i]
		if tar == "." {
			continue
		}

		j := i
		for j >= 0 && diskBlocks[j] != "." && diskBlocks[j] == tar {
			j--
		}

		digitsLen := i - j
		for d := 0; d <= j; d++ {
			if diskBlocks[d] != "." {
				continue
			}

			dj := d
			for diskBlocks[dj] == "." {
				dj++
			}

			dotsLen := dj - d
			if dotsLen >= digitsLen {
				for k := range digitsLen {
					diskBlocks[d+k] = diskBlocks[j+1+k]
					diskBlocks[j+1+k] = "."
				}
				break
			}

			d = dj
		}

		i = j + 1
	}

	return checkSum(diskBlocks)
}

func main() {
	lines := ReadInput("Day09/input.txt")
	diskBlocks := getDiskData(lines)
	fmt.Println("Part 1 answer:", Part1(diskBlocks))
	diskBlocks = getDiskData(lines)
	fmt.Println("Part 2 answer:", Part2(diskBlocks))
}

func ReadInput(fname string) []string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	var line string
	scan := bufio.NewScanner(file)

	for scan.Scan() {
		line = scan.Text()
	}

	return strings.Split(line, "")
}
