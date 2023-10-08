export default function formatSqlInput(input: string) {
  let newInput = "";

  for (let i = 0; i < input.length; i++) {
    newInput = newInput + input[i];
    if (input[i] === "'") {
      newInput = newInput + input[i];
    }
  }

  return(newInput)
}
