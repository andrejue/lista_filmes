import { useParams } from "react-router";
import Search from "./search/Search";

export default function PageReload() {
  let query = useParams();

  return <Search key={query} />;
}
