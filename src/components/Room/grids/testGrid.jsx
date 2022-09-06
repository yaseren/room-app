import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './grids.css'

function ResponsiveAutoExample({ height }) {
  const style = {
   
    color: "#fff",
    padding: 5,
 
  }
  
  const array=[1,2,3,4];
  const getGrid=(a)=>{
    if (a<=2){
      return 6
    }else if(a>2 && a<=4) {
      return 6
    } else if(a>4 && a<=9) {
      return 4
    }else if(a>8 && a<=12) {
      return 3
    }else if(a>12 && a<=24) {
      return 2
    }else if(a>24 && a<=48) {
      return 1
    }
  }

  return (
   
   
    <Container>
      <Row>
        {
           array.map(i=>{
            return(
              <Col style={style}  md={getGrid(array.length)}>
              <Card>
                <Card.Body style={{Justify:"center"}} >
                  <video loop autoPlay src='/videos/test.mp4' muted controls></video>
                </Card.Body>
              </Card>
            </Col>
            )
          
          })
        }
       
       

      </Row>
    </Container>
  );
}

export default ResponsiveAutoExample;