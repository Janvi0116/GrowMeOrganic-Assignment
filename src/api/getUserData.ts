type UserData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getUserData(): Promise<UserData[]> {
  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      const data: UserData[] = await response.json();
      return data;
  } catch (error) {
      throw new Error("Network call error");
  }
}

export default getUserData;
