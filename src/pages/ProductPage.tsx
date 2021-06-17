import React from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../lib/api";
import { TProduct } from "../lib/types";

const initialState = {
  isEditable: false,
  id: '',
  name: '',
  price: 0,
  origin: '',
  createdAt: '',
  updatedAt: '',
  photo: ''
}

export const ProductPage = () => {

  const [state, setState] = React.useState<TProduct>(initialState)
  const params = useParams<{productId: string}>();

  React.useEffect(() => {
    getProduct(params.productId).then(res => {
      setState(res.data);
    })
  },[params])
  return <div>
    <h1>{state.name}</h1>
  </div>
}