import { useState, useEffect } from "react"
import { Modal, Jumbotron, Container, Row, Col, Button} from "react-bootstrap";
import fakeArticles from './data/to.json'
import realArticles from './data/nto.json'


function selectRandomArticles() {
  const selectRandom = (arr) => {
    const pos = Math.floor(Math.random() * arr.length)
    return arr[pos]
  }
  const realSelection = selectRandom(realArticles)
  const fakeSelection = selectRandom(fakeArticles)
  return [realSelection, fakeSelection]
}

function App() {
  const [score, updateScore] = useState(0)

  const [articleOne, setArticleOne] = useState()
  const [articleTwo, setArticleTwo] = useState()
  const [showModal, changeShowModal] = useState(false)
  const [wasCorrect, updateWasCorrect] = useState(false)
  const [correct, updateCorrect] = useState({})

  useEffect(() => {
    const selection = selectRandomArticles()
    updateCorrect(selection[0])
    const num = 1 + Math.floor(Math.random() * 1)
    setArticleOne(selection[num])
    setArticleTwo(selection[1-num])
  }, [])

  const selectCallback = (id) => {
    updateWasCorrect(correct.id === id)
    changeShowModal(true)
    if (correct.id === id) {
      updateScore((current) => current+1)
    } else {
      console.log('Wrong')
    }
  }

  const exitModal = () => {
    changeShowModal(false)
    const newSelection = selectRandomArticles()
    updateCorrect(newSelection[0])
    const num = 1 + Math.floor(Math.random() * 1)
    setArticleOne(newSelection[num])
    setArticleTwo(newSelection[1-num])
  }

  // TODO hide background whilst changing 
  return (
    <>
      <Modal show={showModal} backdrop="static">
        <Modal.Header>
          <Modal.Title>{wasCorrect ? "Well Done!" : "Uh-oh"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <a>{correct.link}</a>
          <p>Current score: {score}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {exitModal()}}>Next matchup</Button>
        </Modal.Footer>
      </Modal>
      <Container>
        {/* TODO: center score */}
        <Row>{score}</Row>
        <Row>
          {/* TODO make these span page properly*/}
          <Col><Article article={articleOne} selectCallback={selectCallback}/></Col>
          <Col><Article article={articleTwo} selectCallback={selectCallback}/></Col>
        </Row>
      </Container>
    </>
  );
}

function Article({article, selectCallback}) {

  return (
    <Jumbotron fluid style={{padding: "0.5rem"}}>
      <h1>{article?.title}</h1>
      <Button onClick={() => selectCallback(article?.id)}>Select as real</Button>
    </Jumbotron>
  );
}

export default App;
