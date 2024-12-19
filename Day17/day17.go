package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func Part1(registers []float64, program []int) string {
	regA, regB, regC := registers[0], registers[1], registers[2]
	var finalStr []string
	for i := 0; i < len(program); i += 2 {
		if i > len(program) {
			break
		}

		combo := map[int]float64{
			0: 0,
			1: 1,
			2: 2,
			3: 3,
			4: regA,
			5: regB,
			6: regC,
		}

		p := program[i]
		operand := program[i+1]

		if p == 0 {
			regA = math.Trunc(regA / math.Pow(2, float64(combo[operand])))
		}

		if p == 1 {
			regB = float64(int(regB) ^ int(operand))
		}

		if p == 2 {
			regB = float64(((int(combo[operand]) % 8) + 8) % 8)
		}

		if p == 3 {
			if regA == 0 {
				continue
			}
			i = operand
			i -= 2
		}

		if p == 4 {
			regB = float64(int(regB) ^ int(regC))
		}

		if p == 5 {
			out := float64(((int(combo[operand]) % 8) + 8) % 8)
			k := strconv.FormatFloat(out, 'f', -1, 64)
			finalStr = append(finalStr, k)
		}

		if p == 6 {
			regB = math.Trunc(regA / math.Pow(2, float64(combo[operand])))
		}
		if p == 7 {
			regC = math.Trunc(regA / math.Pow(2, float64(combo[operand])))
		}

	}

	str := strings.Join(finalStr, ",")
	return str
}

func main() {
	lines := ReadInput("Day17/input.txt")

	pattern := `(\d+)`
	re := regexp.MustCompile(pattern)
	regs := re.FindAllString(lines[0], -1)
	progs := re.FindAllString(lines[1], -1)

	registers := make([]float64, len(regs))
	for i, r := range regs {
		x, _ := strconv.Atoi(r)
		registers[i] = float64(x)
	}

	program := make([]int, len(progs))
	for i, r := range progs {
		program[i], _ = strconv.Atoi(r)
	}

	fmt.Println("Part 1 answer:", Part1(registers, program))

}

func ReadInput(fname string) []string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	scan := bufio.NewScanner(file)

	var lines []string

	var line string
	for scan.Scan() {
		line += scan.Text() + "\\n"
	}

	lines = append(lines, strings.Split(line, "\\n\\n")...)

	return lines
}
