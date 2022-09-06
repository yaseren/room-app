

import { Paper } from "@mui/material";
import { border } from "@mui/system";
import GridLayout  from "react-grid-layout";

import "/node_modules/react-grid-layout/css/styles.css"
import "/node_modules/react-resizable/css/styles.css"

class TestGrid extends React.Component {
    render() {
        const mystyle = {
            color: "black",
            backgroundColor: "white",
            padding: "10px",
            fontFamily: "Arial",
            borderRadius:10,
          };
          const style = {
           display:"flex",
          };
      // layout is an array of objects, see the demo for more complete usage
      const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
        { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: "c", x: 4, y: 0, w: 1, h: 2 }
      ];
      return (
        <GridLayout
        style={style}
        className="layout"
        layout={layout}
        cols={12}
        maxRows={2}
        rowHeight={height/6}
        width={width}
        >
            <div key="1" style={mystyle}>1</div>
            <div key="2" style={mystyle}>2</div>
            <div key="3" style={mystyle}>3</div>
            <div key="4" style={mystyle}>4</div>
            
        </GridLayout>
      );
    }
  }

exports default TestGrid;