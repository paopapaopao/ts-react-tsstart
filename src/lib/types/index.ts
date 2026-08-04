export type Recipe = {
  id: number;
  image: string;
  name: string;
  ingredients: string[];
  instructions: string[];

  prepTime: string | null;
  cookTime: string | null;
  difficulty: string | null;
  servings: string | null;
  calories: string | null;
  cuisine: string | null;
  tags: string[] | null;
  mealType: string[] | null;

  createdAt: Date;
  updatedAt: Date;

  userId: string | null;
  reviewCount: string | null;
  rating: string | null;
};
