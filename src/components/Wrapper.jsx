import React, { useEffect } from 'react'
import Form from './Form'
import PurchaseItem from './PurchaseItem'
import PurchseList from './PurchseList'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchases } from '../redux/slices/purcheseThunk'
import styled from 'styled-components'

const Wrapper = () => {
  const dispatch = useDispatch()
  const { isLoading, purchases } = useSelector(state => state.purchases)

  useEffect(() => {
    dispatch(getPurchases())
  }, [dispatch])

  return (
    <Container>
        <h2>My Purchases</h2>
      <Form />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <PurchseList purchases={purchases} />
      )}
    </Container>
  )
}

export default Wrapper

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
`