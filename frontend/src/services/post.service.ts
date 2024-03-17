import { BASE_POST_URL } from "@/constants/constants";

export class PostService {
  async addPost(name: string, content: string, phone: string) {
    try {
      await fetch(BASE_POST_URL, {
        method: 'POST',
        body: JSON.stringify({
          name,
          content,
          phone
        })
      })
    } catch(e) {
      console.log(`Error on creating post: ${e}`)
    }
  }
}