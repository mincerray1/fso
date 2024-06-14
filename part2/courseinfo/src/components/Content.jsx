import Part from './Part'

const Content = ({course}) => {
    return (
      <div>
        {
            course.parts.map(course => 
                <Part part={course.name} exercises={course.exercises} key={course.name} />
            )
        }
      </div>
    )
  }
  
  export default Content