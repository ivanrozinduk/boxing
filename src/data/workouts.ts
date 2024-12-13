export const WORKOUTS = [
  {
    id: 1,
    title: "Morning Yoga Flow",
    duration: "20 min",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
    type: "Yoga",
    intensity: "Low",
    equipment: ["Yoga Mat"],
    focus: ["Flexibility", "Balance"],
    scheme: {
      sets: 1,
      duration: 1200,
      exercises: [
        { name: "Sun Salutation A", duration: "5 min" },
        { name: "Standing Poses", duration: "5 min" },
        { name: "Balance Poses", duration: "5 min" },
        { name: "Cool Down", duration: "5 min" }
      ]
    }
  },
  {
    id: 2,
    title: "HIIT Cardio Blast",
    duration: "30 min",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=1000&q=80",
    type: "Cardio",
    intensity: "High",
    equipment: ["None"],
    focus: ["Endurance", "Fat Loss"],
    scheme: {
      sets: 3,
      duration: 1800,
      exercises: [
        { name: "Jumping Jacks", reps: "30 seconds" },
        { name: "Mountain Climbers", reps: "30 seconds" },
        { name: "Burpees", reps: "30 seconds" },
        { name: "Rest", duration: "1 min" }
      ]
    }
  },
  {
    id: 3,
    title: "Strength Training 101",
    duration: "45 min",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80",
    type: "Strength",
    intensity: "Medium",
    equipment: ["Dumbbells", "Bench"],
    focus: ["Strength", "Muscle Growth"],
    scheme: {
      sets: 3,
      duration: 2700,
      exercises: [
        { name: "Dumbbell Squats", reps: "12 reps", rest: "60 sec" },
        { name: "Bench Press", reps: "10 reps", rest: "60 sec" },
        { name: "Bent Over Rows", reps: "12 reps", rest: "60 sec" },
        { name: "Cool Down", duration: "5 min" }
      ]
    }
  }
];