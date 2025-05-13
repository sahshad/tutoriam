import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/user/home/Header";
import { BookOpen, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-[4%] py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About Tutoriam
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Tutoriam is your gateway to world-class online learning, empowering
            students and instructors to achieve their goals through innovative
            education.
          </p>
          <Button asChild>
            <a href="/courses">Explore Courses</a>
          </Button>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <BookOpen className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Accessible Learning
                  </h3>
                  <p className="text-muted-foreground">
                    We believe education should be accessible to everyone. Tutoriam
                    offers a wide range of courses from expert instructors, available
                    anytime, anywhere.
                  </p>
                </div>
                <div className="flex-1">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Community-Driven
                  </h3>
                  <p className="text-muted-foreground">
                    Our platform fosters a vibrant community of learners and
                    educators, encouraging collaboration and knowledge sharing.
                  </p>
                </div>
                <div className="flex-1">
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Certified Excellence
                  </h3>
                  <p className="text-muted-foreground">
                    Earn industry-recognized certifications to boost your career,
                    backed by Tutoriam’s rigorous course standards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Jane Doe",
                role: "Founder & CEO",
                bio: "Passionate about education, Jane leads Tutoriam with a vision to revolutionize online learning.",
              },
              {
                name: "John Smith",
                role: "CTO",
                bio: "John drives our cutting-edge technology, ensuring a seamless experience for all users.",
              },
              {
                name: "Emily Chen",
                role: "Head of Content",
                bio: "Emily curates our diverse course offerings, working with top instructors worldwide.",
              },
            ].map((member) => (
              <Card key={member.name}>
                <CardContent className="text-center pt-6">
                  <div className="h-24 w-24 rounded-full bg-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-primary/5 py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Join the Tutoriam Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Start your learning journey or share your expertise as an instructor.
            Together, we can shape the future of education.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="/signup">Get Started</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}