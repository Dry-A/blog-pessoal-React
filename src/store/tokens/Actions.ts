
export type Action = {type: "ADD_TOKEN"; payload:string};
// payload é a propriedade que armazena o token
// tipo da action segunda é a info que a action está levando

export const addToken = (token: string): Action =>({
    type:"ADD_TOKEN",
    payload: token
});
   
