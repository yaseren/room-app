import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import VideoPlayer from '../VideoPlayer';
import './grids.css'
import { useEffect } from 'react';

function VideoGrid({ height, sources }) {
  useEffect(() => {
    console.log(sources);
  }, [sources])

  const style = {

    color: "#fff",
    padding: 5,


  }


  const getGrid = (a) => {
    if (a === 1) {
      return 12
    }
    else if (a === 2) {
      return 6
    } else if (a > 2 && a <= 4) {
      return 6
    } else if (a > 4 && a <= 9) {
      return 4
    } else if (a > 8 && a <= 12) {
      return 3
    } else if (a > 12 && a <= 24) {
      return 2
    } else if (a > 24 && a <= 48) {
      return 1
    }
  }

  return (

    <Container>
      <Row>
        {sources.length > 0 ? (
          <>
            {
              sources.map((media) => {
                return (
                  <Col style={style} key={media.id} md={getGrid(sources.length)}>
                    <Card>
                      <Card.Title>
                        {media.label}
                      </Card.Title>
                      <Card.Body style={{ Justify: "center", display: 'flex', backgroundColor: 'black' }} >
                        <VideoPlayer
                          stream={media}
                        />
                        {/* <video loop autoPlay src='/videos/test.mp4' muted controls></video> */}
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })
            }
          </>

        ) : (
          null
        )

        }
      </Row>
    </Container>

  );
}

export default VideoGrid;