// QuizQuestions.js
export const introQuestions = [
  {
    questionText:
      "What is the purpose of the @nonreentrant decorator in Vyper?",
    answerOptions: [
      { answerText: "To prevent gas optimization", isCorrect: false },
      {
        answerText: "To prevent recursive calls to the same function",
        isCorrect: true,
      },
      { answerText: "To mark a function as private", isCorrect: false },
      { answerText: "To disable function overloading", isCorrect: false },
    ],
  },
  {
    questionText: "What is the default visibility of functions in Vyper?",
    answerOptions: [
      { answerText: "@external", isCorrect: false },
      { answerText: "@internal", isCorrect: true },
      { answerText: "@public", isCorrect: false },
      { answerText: "@private", isCorrect: false },
    ],
  },
  {
    questionText: "Which keyword is used to define a new event in Vyper?",
    answerOptions: [
      { answerText: "event", isCorrect: true },
      { answerText: "Event", isCorrect: false },
      { answerText: "emit", isCorrect: false },
      { answerText: "new_event", isCorrect: false },
    ],
  },
  {
    questionText: "What is the correct way to declare a constant in Vyper?",
    answerOptions: [
      { answerText: "CONSTANT name = value", isCorrect: false },
      { answerText: "const name: type = value", isCorrect: false },
      { answerText: "name: constant(type) = value", isCorrect: true },
      { answerText: "@constant name = value", isCorrect: false },
    ],
  },
  {
    questionText: "Which of these is a valid Boolean value in Vyper?",
    answerOptions: [
      { answerText: "TRUE", isCorrect: false },
      { answerText: "true", isCorrect: false },
      { answerText: "True", isCorrect: true },
      { answerText: "1", isCorrect: false },
    ],
  },
  {
    questionText: "What is the purpose of the @deploy decorator in Vyper?",
    answerOptions: [
      {
        answerText: "To mark a function that deploys other contracts",
        isCorrect: false,
      },
      {
        answerText:
          "To indicate a function that can be called during deployment",
        isCorrect: false,
      },
      { answerText: "To mark the constructor function", isCorrect: true },
      { answerText: "To specify deployment parameters", isCorrect: false },
    ],
  },
  {
    questionText: "How do you log an event in Vyper?",
    answerOptions: [
      { answerText: "emit Event(...)", isCorrect: false },
      { answerText: "log Event(...)", isCorrect: true },
      { answerText: "Event.emit(...)", isCorrect: false },
      { answerText: "self.Event(...)", isCorrect: false },
    ],
  },
  {
    questionText: "What is the default value for a bool type in Vyper?",
    answerOptions: [
      { answerText: "True", isCorrect: false },
      { answerText: "False", isCorrect: true },
      { answerText: "None", isCorrect: false },
      { answerText: "0", isCorrect: false },
    ],
  },
  {
    questionText: "How do you access state variables in Vyper?",
    answerOptions: [
      { answerText: "Using this keyword", isCorrect: false },
      { answerText: "Directly by name", isCorrect: false },
      { answerText: "Using the self object", isCorrect: true },
      { answerText: "Using the state keyword", isCorrect: false },
    ],
  },
  {
    questionText: "What is the purpose of the @view decorator?",
    answerOptions: [
      {
        answerText: "To make a function callable externally",
        isCorrect: false,
      },
      {
        answerText: "To indicate a function that can modify state",
        isCorrect: false,
      },
      {
        answerText: "To mark a function that only reads state",
        isCorrect: true,
      },
      { answerText: "To specify function visibility", isCorrect: false },
    ],
  },
  {
    questionText: "How are public variables accessed in Vyper?",
    answerOptions: [
      { answerText: "Through manual getter functions", isCorrect: false },
      {
        answerText: "Automatically generated getter functions",
        isCorrect: true,
      },
      { answerText: "Direct external access", isCorrect: false },
      { answerText: "Using the public keyword", isCorrect: false },
    ],
  },
  {
    questionText:
      "What is the default mutability level for functions in Vyper?",
    answerOptions: [
      { answerText: "@pure", isCorrect: false },
      { answerText: "@view", isCorrect: false },
      { answerText: "@payable", isCorrect: false },
      { answerText: "@nonpayable", isCorrect: true },
    ],
  },
  {
    questionText: "How do you declare a bytes array in Vyper?",
    answerOptions: [
      { answerText: "bytes[length]", isCorrect: false },
      { answerText: "Bytes[maxLen]", isCorrect: true },
      { answerText: "bytearray(length)", isCorrect: false },
      { answerText: "bytes(maxLen)", isCorrect: false },
    ],
  },
  {
    questionText: "What is the purpose of the empty() function in Vyper?",
    answerOptions: [
      { answerText: "To clear a variable's contents", isCorrect: false },
      { answerText: "To check if a variable is empty", isCorrect: false },
      { answerText: "To return a zero value for a type", isCorrect: true },
      { answerText: "To delete a variable", isCorrect: false },
    ],
  },
  {
    questionText: "How do you handle errors in Vyper?",
    answerOptions: [
      { answerText: "Using try/catch blocks", isCorrect: false },
      { answerText: "Using assert statements", isCorrect: true },
      { answerText: "Using error handlers", isCorrect: false },
      { answerText: "Using exception blocks", isCorrect: false },
    ],
  },
  {
    questionText: "What is the purpose of the @payable decorator?",
    answerOptions: [
      { answerText: "To enable function overloading", isCorrect: false },
      { answerText: "To allow a function to receive Ether", isCorrect: true },
      {
        answerText: "To make a function callable externally",
        isCorrect: false,
      },
      { answerText: "To enable payment processing", isCorrect: false },
    ],
  },
  {
    questionText: "How are structs declared in Vyper?",
    answerOptions: [
      { answerText: "Using the class keyword", isCorrect: false },
      { answerText: "Using the type keyword", isCorrect: false },
      { answerText: "Using the struct keyword", isCorrect: true },
      { answerText: "Using the interface keyword", isCorrect: false },
    ],
  },
  {
    questionText: "What is the purpose of the self.balance property?",
    answerOptions: [
      { answerText: "To check the user's wallet balance", isCorrect: false },
      { answerText: "To check the contract's Ether balance", isCorrect: true },
      { answerText: "To calculate transaction fees", isCorrect: false },
      { answerText: "To verify token balances", isCorrect: false },
    ],
  },
  {
    questionText: "How do you declare a mapping in Vyper?",
    answerOptions: [
      { answerText: "mapping(key => value)", isCorrect: false },
      { answerText: "HashMap[key_type, value_type]", isCorrect: true },
      { answerText: "dict[key_type: value_type]", isCorrect: false },
      { answerText: "map<key_type, value_type>", isCorrect: false },
    ],
  },
  {
    questionText: "What is the purpose of block.timestamp?",
    answerOptions: [
      {
        answerText: "To get the current block's mining time",
        isCorrect: false,
      },
      {
        answerText: "To get the current block's epoch timestamp",
        isCorrect: true,
      },
      { answerText: "To get the transaction timestamp", isCorrect: false },
      { answerText: "To get the contract creation time", isCorrect: false },
    ],
  },
  {
    questionText: "How do you access msg.value in Vyper?",
    answerOptions: [
      { answerText: "Only in @payable functions", isCorrect: true },
      { answerText: "In any function", isCorrect: false },
      { answerText: "Only in @external functions", isCorrect: false },
      { answerText: "Only in @view functions", isCorrect: false },
    ],
  },
  {
    questionText: "What is the purpose of msg.sender?",
    answerOptions: [
      { answerText: "To get the contract owner's address", isCorrect: false },
      {
        answerText: "To get the current function caller's address",
        isCorrect: true,
      },
      { answerText: "To get the contract's address", isCorrect: false },
      {
        answerText: "To get the transaction originator's address",
        isCorrect: false,
      },
    ],
  },
  {
    questionText: "How do you import another Vyper contract?",
    answerOptions: [
      { answerText: "Using require", isCorrect: false },
      { answerText: "Using include", isCorrect: false },
      { answerText: "Using import", isCorrect: true },
      { answerText: "Using from", isCorrect: false },
    ],
  },
  {
    questionText: "What is the purpose of __init__ function in Vyper?",
    answerOptions: [
      { answerText: "To initialize variables", isCorrect: false },
      { answerText: "To serve as the contract constructor", isCorrect: true },
      { answerText: "To reset contract state", isCorrect: false },
      { answerText: "To initialize interfaces", isCorrect: false },
    ],
  },
  {
    questionText: "How do you declare a fixed-size list in Vyper?",
    answerOptions: [
      { answerText: "list[type, size]", isCorrect: false },
      { answerText: "type[size]", isCorrect: true },
      { answerText: "Array<type>(size)", isCorrect: false },
      { answerText: "fixed_list<type, size>", isCorrect: false },
    ],
  },
];

export const expertQuestions = [
  {
    questionText:
      "What is the difference between transient storage and regular storage in Vyper?",
    answerOptions: [
      {
        answerText: "Transient storage is cheaper but persists between blocks",
        isCorrect: false,
      },
      {
        answerText:
          "Transient storage persists only within the same transaction",
        isCorrect: true,
      },
      {
        answerText: "Transient storage is just another name for memory",
        isCorrect: false,
      },
      {
        answerText: "Transient storage is used only for constant variables",
        isCorrect: false,
      },
    ],
  },
  {
    questionText:
      "How does Vyper handle reentrancy protection with the TSTORE opcode?",
    answerOptions: [
      { answerText: "By using permanent storage locks", isCorrect: false },
      { answerText: "By using memory variables", isCorrect: false },
      { answerText: "By using transient storage for locks", isCorrect: true },
      { answerText: "By disabling external calls", isCorrect: false },
    ],
  },
  {
    questionText:
      "What is the difference between create_copy_of and create_minimal_proxy_to?",
    answerOptions: [
      {
        answerText:
          "create_copy_of deploys a new copy while create_minimal_proxy_to creates an EIP-1167 proxy",
        isCorrect: true,
      },
      {
        answerText: "They are different names for the same functionality",
        isCorrect: false,
      },
      {
        answerText:
          "create_minimal_proxy_to is more gas efficient for deployment",
        isCorrect: false,
      },
      {
        answerText:
          "create_copy_of creates a proxy while create_minimal_proxy_to creates a copy",
        isCorrect: false,
      },
    ],
  },
  {
    questionText:
      "How does Vyper handle storage layout for upgradeable contracts?",
    answerOptions: [
      {
        answerText: "It doesn't support upgradeable contracts",
        isCorrect: false,
      },
      {
        answerText: "Through automatic storage slot calculation",
        isCorrect: false,
      },
      { answerText: "Using storage layout override files", isCorrect: true },
      { answerText: "Through inheritance", isCorrect: false },
    ],
  },
  {
    questionText: "What is the purpose of the raw_revert() function in Vyper?",
    answerOptions: [
      { answerText: "To handle regular reverts", isCorrect: false },
      {
        answerText: "To revert with custom low-level error data",
        isCorrect: true,
      },
      { answerText: "To revert without any message", isCorrect: false },
      { answerText: "To revert and refund gas", isCorrect: false },
    ],
  },
  {
    questionText:
      "How do external calls from view functions differ from regular external calls?",
    answerOptions: [
      {
        answerText: "They can only call other view functions",
        isCorrect: false,
      },
      {
        answerText: "They use STATICCALL opcode to prevent state changes",
        isCorrect: true,
      },
      {
        answerText: "They are processed with higher priority",
        isCorrect: false,
      },
      { answerText: "They cannot return data", isCorrect: false },
    ],
  },
  {
    questionText:
      "What is the purpose of the MCOPY opcode in Vyper's memory operations?",
    answerOptions: [
      { answerText: "To copy storage to memory", isCorrect: false },
      { answerText: "To optimize memory-to-memory copies", isCorrect: true },
      { answerText: "To initialize memory", isCorrect: false },
      { answerText: "To clear memory", isCorrect: false },
    ],
  },
  {
    questionText:
      "How does Vyper handle bitwise operations for uint256 values?",
    answerOptions: [
      { answerText: "Through special function calls", isCorrect: false },
      { answerText: "Using standard operators (&, |, ^, ~)", isCorrect: true },
      { answerText: "Only through built-in functions", isCorrect: false },
      { answerText: "Bitwise operations are not supported", isCorrect: false },
    ],
  },
  {
    questionText:
      "What is the purpose of the skip_contract_check parameter in raw_call?",
    answerOptions: [
      { answerText: "To bypass gas limits", isCorrect: false },
      {
        answerText: "To skip EXTCODESIZE check for contract existence",
        isCorrect: true,
      },
      { answerText: "To disable return data validation", isCorrect: false },
      { answerText: "To ignore revert messages", isCorrect: false },
    ],
  },

  {
    questionText: "How does Vyper implement the CREATE2 opcode functionality?",
    answerOptions: [
      { answerText: "Through automatic salt generation", isCorrect: false },
      {
        answerText: "By adding an optional salt parameter to create functions",
        isCorrect: true,
      },
      { answerText: "Using a dedicated create2() function", isCorrect: false },
      { answerText: "It doesn't support CREATE2", isCorrect: false },
    ],
  },
  {
    questionText: "What is unique about implementing interfaces in Vyper?",
    answerOptions: [
      { answerText: "They allow multiple inheritance", isCorrect: false },
      {
        answerText: "Events defined in interfaces are automatically imported",
        isCorrect: true,
      },
      {
        answerText: "They require manual function implementations",
        isCorrect: false,
      },
      {
        answerText: "They can't be implemented by contracts",
        isCorrect: false,
      },
    ],
  },
  {
    questionText: "How does Vyper handle function overloading?",
    answerOptions: [
      { answerText: "Through decorator patterns", isCorrect: false },
      { answerText: "Using different function names", isCorrect: false },
      {
        answerText: "It doesn't support function overloading",
        isCorrect: true,
      },
      { answerText: "Through interface inheritance", isCorrect: false },
    ],
  },
  {
    questionText:
      "What is the purpose of the `code` attribute in address type?",
    answerOptions: [
      { answerText: "To get the contract's source code", isCorrect: false },
      { answerText: "To access deployed contract bytecode", isCorrect: true },
      { answerText: "To modify contract code", isCorrect: false },
      { answerText: "To check contract size", isCorrect: false },
    ],
  },
  {
    questionText: "How does Vyper handle decimal precision?",
    answerOptions: [
      { answerText: "Using floating point numbers", isCorrect: false },
      {
        answerText: "Using base-10 fixed point with 10 decimal places",
        isCorrect: true,
      },
      { answerText: "Using binary fixed point", isCorrect: false },
      { answerText: "Using arbitrary precision", isCorrect: false },
    ],
  },
  {
    questionText:
      "What is the purpose of the `internal` keyword in module functions?",
    answerOptions: [
      { answerText: "To mark functions as private", isCorrect: false },
      { answerText: "To enable calling between contracts", isCorrect: false },
      {
        answerText:
          "To restrict function visibility to within the contract/module",
        isCorrect: true,
      },
      { answerText: "To optimize gas usage", isCorrect: false },
    ],
  },
  {
    questionText: "How does Vyper handle memory deallocation?",
    answerOptions: [
      { answerText: "Through automatic garbage collection", isCorrect: false },
      { answerText: "Manual deallocation required", isCorrect: false },
      {
        answerText: "Memory slots are reused within the same function",
        isCorrect: true,
      },
      { answerText: "Memory is never deallocated", isCorrect: false },
    ],
  },
  {
    questionText:
      "What is the purpose of the `default_return_value` in external calls?",
    answerOptions: [
      { answerText: "To set fallback return values", isCorrect: false },
      {
        answerText: "To handle missing return data from ERC20 tokens",
        isCorrect: true,
      },
      { answerText: "To optimize gas usage", isCorrect: false },
      { answerText: "To initialize variables", isCorrect: false },
    ],
  },
  {
    questionText: "How does Vyper handle unsafe arithmetic operations?",
    answerOptions: [
      { answerText: "Through built-in overflow checking", isCorrect: false },
      {
        answerText: "Using unsafe_add, unsafe_sub, etc. functions",
        isCorrect: true,
      },
      { answerText: "With compiler optimizations", isCorrect: false },
      { answerText: "By default all operations are unsafe", isCorrect: false },
    ],
  },
  {
    questionText:
      "What is the purpose of the `create_from_blueprint` function?",
    answerOptions: [
      { answerText: "To clone existing contracts", isCorrect: false },
      {
        answerText: "To deploy contracts from initcode stored at target",
        isCorrect: true,
      },
      { answerText: "To create proxy contracts", isCorrect: false },
      { answerText: "To upgrade contracts", isCorrect: false },
    ],
  },
  {
    questionText: "How does Vyper handle storage variables in modules?",
    answerOptions: [
      { answerText: "Through automatic initialization", isCorrect: false },
      { answerText: "Using the initializes keyword", isCorrect: true },
      { answerText: "Through inheritance", isCorrect: false },
      {
        answerText: "Storage variables are not allowed in modules",
        isCorrect: false,
      },
    ],
  },
  {
    questionText: "What is the purpose of the `uses` keyword in modules?",
    answerOptions: [
      { answerText: "To import external modules", isCorrect: false },
      {
        answerText: "To declare module dependencies without initialization",
        isCorrect: true,
      },
      { answerText: "To specify module interfaces", isCorrect: false },
      { answerText: "To mark module exports", isCorrect: false },
    ],
  },
  {
    questionText: "How does Vyper handle module exports?",
    answerOptions: [
      {
        answerText: "Through automatic export of all functions",
        isCorrect: false,
      },
      { answerText: "Using explicit exports statements", isCorrect: true },
      { answerText: "Through inheritance", isCorrect: false },
      { answerText: "Exports are not supported", isCorrect: false },
    ],
  },
  {
    questionText: "What is special about flag types in Vyper?",
    answerOptions: [
      { answerText: "They store boolean values", isCorrect: false },
      {
        answerText: "They provide typesafe bitwise operations",
        isCorrect: true,
      },
      { answerText: "They are used for event logging", isCorrect: false },
      { answerText: "They are alias for enums", isCorrect: false },
    ],
  },
  {
    questionText: "How does Vyper handle modular code organization?",
    answerOptions: [
      { answerText: "Through class inheritance", isCorrect: false },
      { answerText: "Using composition and modules", isCorrect: true },
      { answerText: "Through traits", isCorrect: false },
      { answerText: "Using mixins", isCorrect: false },
    ],
  },
  {
    questionText:
      "What is the significance of the `code_offset` parameter in create_from_blueprint?",
    answerOptions: [
      { answerText: "To specify gas limit", isCorrect: false },
      { answerText: "To skip ERC-5202 preamble", isCorrect: true },
      { answerText: "To optimize deployment", isCorrect: false },
      { answerText: "To set initialization data", isCorrect: false },
    ],
  },
];
