import './App.css';
import { useEffect, useRef, useState } from 'react';
import { WorkflowFactory } from "cwlts/models";
import { Workflow, SVGArrangePlugin, SVGEdgeHoverPlugin, SVGNodeMovePlugin, SVGPortDragPlugin, SelectionPlugin, ZoomPlugin } from 'cwl-svg';
import data from './rna-seq-alignment.json';

function App() {
  const instance = useRef();
  const [workflow, setWorkflow] = useState();

  useEffect(() => {
    const wf = WorkflowFactory.from(data);
    const workflow = new Workflow({
      model: wf,
      svgRoot: instance.current,
      plugins: [
          new SVGArrangePlugin(),
          new SVGEdgeHoverPlugin(),
          new SVGNodeMovePlugin({
              movementSpeed: 10
          }),
          new SVGPortDragPlugin(),
          new SelectionPlugin(),
          new ZoomPlugin(),
      ]
    });
    workflow.getPlugin(SVGArrangePlugin).arrange();

    setWorkflow(workflow);
  }, []);

  const handleSaveData = () => {
    console.log(workflow.model.serialize())
  }

  return (
    <div>
      <button onClick={handleSaveData} style={{position: 'absolute', top: 0, left: 0, zIndex: 10}}>Save</button>
      <svg ref={instance} style={{width: '100vw', height: '100vh'}} className='cwl-workflow'></svg>
    </div>
  );
}

export default App;
