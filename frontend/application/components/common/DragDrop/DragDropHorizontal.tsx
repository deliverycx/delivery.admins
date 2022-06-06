import { FC, ReactNode, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface IProps{
	list:[]
	render:any,
	handle:any
}

const DragDropHorizontal:FC<IProps> = ({list,render,handle}) =>{

	const [complite,setComplite] = useState<any>(list)

	useEffect(()=>{
		list && setComplite(getItems(list))
	},[list])

	const getItems = (count:any) =>
	  count.map((k:any) => ({
	    id: `item-${k}`,
	    content: k,
  }));

	const reorder = (listArr:any, startIndex:any, endIndex:any) => {
		const [removed] = listArr.splice(startIndex, 1);
		listArr.splice(endIndex, 0, removed);
		return listArr;
	};

	const onDragEnd = (result:any) =>{
		const items = reorder(
      list,
      result.source.index,
      result.destination.index
    );

		setComplite(getItems(items))
		handle(items)
	}

	// style
	const grid = 4;
	const getItemStyle = (isDragging:any, draggableStyle:any) => ({
	  userSelect: 'none',
	  padding: grid * 2,
	  margin: `0 ${grid}px 0 0`,
	  background: isDragging ? 'lightgreen' : '#f0f0f0',
	  ...draggableStyle,
	});

	const getListStyle = (isDraggingOver:any) => ({
	  background: isDraggingOver ? 'lightblue' : 'lightgrey',
	  display: 'flex',
	  padding: grid,
	  overflow: 'auto',
	});

	return (
		<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {complite &&
										complite.map((val:any,index:number)=> {
											return (
												<Draggable key={val.id} draggableId={val.id} index={index}>
													{(provided, snapshot) => (
														
														<div
														ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={getItemStyle(
																snapshot.isDragging,
																provided.draggableProps.style
															)}
														className="col-sm-2">
														{
															render(val)
														}
													</div>
													)}
												</Draggable>
											)
										})}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
	)
}
export default DragDropHorizontal