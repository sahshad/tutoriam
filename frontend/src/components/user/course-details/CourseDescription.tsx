interface CourseDescriptionProps {
    description: string
    whatYouWillLearn:any
  }
  
  export default function CourseDescription({ description, whatYouWillLearn }: CourseDescriptionProps) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Description</h2>
        <p>{description}</p>
        {/* {description.map((paragraph, index) => (
          <p key={index} className="text-muted-foreground">
            {paragraph}
          </p>
        ))} */}
        <h3 className="text-lg font-bold">what you will learn</h3>
        <ul>
          {whatYouWillLearn.map((item:any) => (
            <li > • {JSON.parse(item).content}</li>
          ))}
        </ul>
      </div>
    )
  }
  
  