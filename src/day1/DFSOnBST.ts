function search(node: BinaryNode<number> | null, value: number): boolean {
  if (!node) {
    return false
  }

  if (node.value === value) {
    return true
  }

  if (node.value < value) {
    return search(node.right, value)
  }
  return search(node.left, value)
}
export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return search(head, needle);
}
