import AuthCxt from "./AuthContext";

const cartReducer = (state, action) => {
  let { type, payload } = action;
  //console.log(type, payload);
  let flag = true;
  let { user } = AuthCxt();

  state.cart.forEach((e) => {
    if (e.title == payload.title) {
      flag = false;
      alert("Product already added!");
    }
  });
  if (!flag) return state;
  payload = { ...payload, quantity: 1 };

  switch (type) {
    case "AddToCart": {
      crudCart(user, payload);
      return { ...state, cart: [...state.cart, payload] };
    }
    default:
      return state;
  }
};

export default cartReducer;

function removeSpecialCharacters(text) {
  const cleanedText = text.replace(/[.@]/g, "");
  return cleanedText;
}

const crudCart = async (email, payload) => {
  let cleanEmail = removeSpecialCharacters(email);
  let userdata = await fetch(
    `https://crudcrud.com/api/426bbbbc3490407db55ce9c3e95d1267/${cleanEmail}`,
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  userdata = await userdata.json();
  console.log(userdata);
  console.log(cleanEmail);
};