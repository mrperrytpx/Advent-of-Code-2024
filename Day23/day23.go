package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"slices"
	"sort"
	"strings"
)

func mapOfNeighbours(ordeRules []string) map[string][]string {
	m := make(map[string][]string)

	for _, order := range ordeRules {
		pair := strings.Split(order, "-")
		left, right := pair[0], pair[1]

		m[left] = append(m[left], right)
		m[right] = append(m[right], left)
	}

	return m
}

func Part1(lines []string) int {
	interCon := mapOfNeighbours(lines)
	allTs := make(map[string]bool)
	for k, v := range interCon {
		for i := range v {
			for j := range v {
				l := v[i]
				r := v[j]

				if l == r {
					continue
				}

				lv := interCon[l]
				rv := interCon[r]
				if slices.Contains(lv, r) && slices.Contains(rv, l) {
					if strings.HasPrefix(k, "t") || strings.HasPrefix(l, "t") || strings.HasPrefix(r, "t") {

						connectedSet := []string{k, l, r}
						sort.Strings(connectedSet)

						str := strings.Join(connectedSet, ",")
						allTs[str] = true
					}
				}
			}
		}
	}

	return len(allTs)
}

func Part2(lines []string) string {
	//https://www.internetmathematicsjournal.com/api/v1/articles/1586-fast-algorithms-for-the-maximum-clique-problem-on-massive-graphs-with-applications-to-overlapping-community-detection.pdf
	interCon := mapOfNeighbours(lines)
	maxSize := 1
	var maxClique []string

	var computers []string
	for key := range interCon {
		computers = append(computers, key)
	}

	var Clique func(graph map[string][]string, candidateNeighbours map[string]bool, size int, currClique []string) []string

	Clique = func(graph map[string][]string, candidateNeighbours map[string]bool, size int, currClique []string) []string {
		if len(candidateNeighbours) == 0 {
			if size > maxSize {
				maxSize = size
				maxClique = currClique
			}
			return nil
		}

		for len(candidateNeighbours) > 0 {
			if size+len(candidateNeighbours) <= maxSize {
				return nil
			}

			var nextComp string
			for comp := range candidateNeighbours {
				nextComp = comp
				break
			}
			delete(candidateNeighbours, nextComp)

			nextCompNeighbours := make(map[string]bool)
			for _, w := range graph[nextComp] {
				if len(graph[w]) >= maxSize {
					nextCompNeighbours[w] = true
				}
			}

			intersections := make(map[string]bool)
			for v := range candidateNeighbours {
				if _, ok := nextCompNeighbours[v]; ok {
					intersections[v] = true
				}
			}

			Clique(graph, intersections, size+1, append(currClique, nextComp))

		}
		return nil
	}

	for i := range computers {
		comp := computers[i]
		if len(interCon[comp]) >= maxSize {
			candidateNeighbours := make(map[string]bool)

			for _, connection := range interCon[comp] {
				idx := slices.Index(computers, connection)
				if idx > i {
					if len(interCon[connection]) >= maxSize {
						candidateNeighbours[connection] = true
					}
				}
			}

			Clique(interCon, candidateNeighbours, 1, []string{comp})
		}
	}

	sort.Strings(maxClique)
	return strings.Join(maxClique, ",")
}

func main() {
	lines := ReadInput("Day23/input.txt")
	fmt.Println("Part 1 answer:", Part1(lines))
	fmt.Println("Part 2 answer:", Part2(lines))
}

func ReadInput(fname string) []string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	var lines []string
	scan := bufio.NewScanner(file)
	for scan.Scan() {
		lines = append(lines, scan.Text())
	}

	return lines
}
