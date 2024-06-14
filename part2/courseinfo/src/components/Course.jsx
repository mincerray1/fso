import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
    const total = course.parts.reduce((s, p) => {        
        return s + p.exercises
      }, 0)

    return (
        <div>
            <Header course={course.name} />
            <Content course={course} />
            <Total total={total} />
        </div>
    )    
}

export default Course