class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
    
class LinkedList:
    def __init__(self):
        self.head = None

    def is_empty(self):
        return self.head is None
    
    def prepend(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node.data
        else:
            new_node.next = self.head
            self.head = new_node

    def append(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node

    def delete(self, data):
        if self.is_empty():
            return 

        current = self.head
        prev = None

        while current:
            if current.data == data:
                prev.next = current.next
            prev = current 
            current = current.next

    def search(self, data):
        if self.is_empty():
            return False
        
        current = self.head
        while current:
            if current.data == data:
                return True
            current = current.next
        
        return False
    
    def print_linklist(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        
        print(None)

linked_list = LinkedList()
linked_list.append(3)
linked_list.append(4)
linked_list.append(5)
linked_list.prepend(2)

linked_list.print_linklist()

linked_list.delete(4)

linked_list.print_linklist()

print(linked_list.search(5)) 
print(linked_list.search(20)) 
            





