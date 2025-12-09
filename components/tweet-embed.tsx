import { Tweet } from "react-tweet"

const TweetEmbed = ({ tweetId }: { tweetId: string }) => {
  return <Tweet id={tweetId} />
}

export default TweetEmbed
