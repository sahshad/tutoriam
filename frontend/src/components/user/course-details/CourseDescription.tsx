interface CourseDescriptionProps {
    description: string[]
  }
  
  export default function CourseDescription({ description }: CourseDescriptionProps) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Description</h2>
        {description.map((paragraph, index) => (
          <p key={index} className="text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    )
  }
  
  