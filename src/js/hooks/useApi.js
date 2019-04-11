import { useState, useEffect } from 'react'
import fetchData from 'js/data/fetchData'

export const useApi = (dataLocation, effectDependencies) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    const loadData = () => {
      setLoading(true)
      setErrors(null)

      return fetchData(dataLocation)
        .then(result => {
          setData(result)
          setLoading(false)
        })
        .catch(errors => {
          setLoading(false)
          setErrors(errors)
        })
    }

    loadData()
  }, effectDependencies)

  return {
    data,
    loading,
    errors
  }
}
