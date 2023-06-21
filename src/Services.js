export const getCategories = async (setLoader, setCategories) => {
    setLoader(true)

    const res = await fetch('https://opentdb.com/api_category.php')
    const data = await res.json()
    setCategories(data.trivia_categories)
    
    setLoader(false)
  }


export const getQuiz = async (setLoader, category, difficulty, setQuizData) => {
  setLoader(true)

  const res = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple&category=${category}&difficulty=${difficulty}`)
  const data = await res.json()
  setQuizData(data.results)
    
  setLoader(false)
}