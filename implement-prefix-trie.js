class Node {
  constructor(val, isWord) {
    this.val = val;
    this.isWord = isWord;
    this.children = {};
  }

  addChild(node) {
    this.children[node.val] = node;
  }

  markAsWord() {
    this.isWord = true;
  }
}

class Trie {
  constructor() {
    this.root = new Node(null);
  }

  addWord(word) {
    let current = this.root;
    for (let i = 1; i <= word.length; i++) {
      const substr = word.substr(0, i);
      if (current.children[substr] === undefined) {
        current.addChild(new Node(substr, substr === word));
      }
      current = current.children[substr];
    }
    current.markAsWord();
  }

  hasPrefix(prefix) {
    let current = this.root;
    for (let i = 1; i <= prefix.length; i++) {
      const substr = prefix.substr(0, i);
      if (current.children[substr] === undefined) {
        return false;
      }
      current = current.children[substr];
    }

    return true;
  }

  search(word) {
    let current = this.root;
    for (let i = 1; i <= word.length; i++) {
      const substr = word.substr(0, i);
      if (current.children[substr] === undefined) {
        return false;
      }
      current = current.children[substr];
    }

    if (current.val !== word || !current.isWord) return false;

    return true;
  }
}


const trie = new Trie();
trie.addWord('apple');

console.log(trie.search('apple'));
// console.log(trie);
// console.log(trie.root.children['a']);