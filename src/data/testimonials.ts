export interface Testimonial {
  stars: number;
  text: string;
  name: string;
  professionOrLocation: string;
}

export const testimonials: Testimonial[] = [
  {
    stars: 5,
    text: "This platform has revolutionized my trading strategy. The insights are unparalleled!",
    name: "Arjun Sharma",
    professionOrLocation: "Options Trader, Mumbai"
  },
  {
    stars: 4,
    text: "A fantastic tool for market analysis. Highly recommend for serious traders.",
    name: "Priya Verma",
    professionOrLocation: "Day Trader, Delhi"
  },
  {
    stars: 5,
    text: "User-friendly interface and powerful features. My profits have significantly increased.",
    name: "Rohit Kumar",
    professionOrLocation: "Software Engineer, Bangalore"
  },
  {
    stars: 5,
    text: "The best trading platform I've used so far. Excellent support and real-time data.",
    name: "Ananya Singh",
    professionOrLocation: "Investment Banker, Chennai"
  },
  {
    stars: 4,
    text: "Great for beginners and experts alike. The educational resources are a huge plus.",
    name: "Vikram Patel",
    professionOrLocation: "Aspiring Investor, Ahmedabad"
  }
];
