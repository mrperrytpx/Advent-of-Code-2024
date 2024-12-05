package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"slices"
	"strconv"
	"strings"
)

type TMapOfNeighbours map[string][]string

func mapOfNeighbours(ordeRules []string) TMapOfNeighbours {
	m := make(map[string][]string)

	for _, order := range ordeRules {
		pair := strings.Split(order, "|")
		left, right := pair[0], pair[1]

		m[left] = append(m[left], right)
		if _, exists := m[right]; !exists {
			m[right] = []string{}
		}
	}

	return m
}

func Part1(m TMapOfNeighbours, pagesToProduce []string) int {
	sumOfPageNums := 0

outerLoop:
	for _, page := range pagesToProduce {
		splitPage := strings.Split(page, ",")

		for i := 1; i < len(splitPage); i++ {
			tarVal := splitPage[i]
			if !slices.Contains(m[splitPage[i-1]], tarVal) {
				continue outerLoop
			}
		}

		middleIdx := (len(splitPage) - 1) / 2
		middleMember, _ := strconv.Atoi(splitPage[middleIdx])
		sumOfPageNums += middleMember
	}

	return sumOfPageNums
}

func Part2(m TMapOfNeighbours, pagesToProduce []string) int {
	sumOfPageNums := 0

	for _, page := range pagesToProduce {
		splitPage := strings.Split(page, ",")
		needsFixing := false

		for i := 1; i < len(splitPage); i++ {
			tarVal := splitPage[i]
			if !slices.Contains(m[splitPage[i-1]], tarVal) {
				needsFixing = true
				break
			}
		}

		if !needsFixing {
			continue
		}

		for i := 1; i < len(splitPage); i++ {
			tarVal := splitPage[i]
			if !slices.Contains(m[splitPage[i-1]], tarVal) {
				temp := splitPage[i]
				splitPage[i] = splitPage[i-1]
				splitPage[i-1] = temp
				i = 0
			}
		}

		middleIdx := (len(splitPage) - 1) / 2
		middleMember, _ := strconv.Atoi(splitPage[middleIdx])
		sumOfPageNums += middleMember
	}

	return sumOfPageNums
}

func main() {
	list := ReadInput("Day05/input.txt")

	var splitIdx int
	for i, row := range list {
		if row == "" {
			splitIdx = i
		}
	}

	orderRules := list[:splitIdx]
	pagesToProduce := list[splitIdx+1:]

	m := mapOfNeighbours(orderRules)

	fmt.Println("Part 1 answer:", Part1(m, pagesToProduce))
	fmt.Println("Part 2 answer:", Part2(m, pagesToProduce))
}

func ReadInput(fname string) []string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	var list []string
	scan := bufio.NewScanner(file)

	for scan.Scan() {
		text := scan.Text()
		list = append(list, text)
	}

	return list
}
