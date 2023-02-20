import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useAuthenticatedFetch } from "./useAuthenticatedFetch";

export default useFetchRedux = ({url, fetchInit = {}}) => {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(false);
  const dispatch = useDispatch();
  const authenticatedFetch = useAuthenticatedFetch();

  const getData = async () => {
    try {
      const response = await authenticatedFetch(url, fetchInit);
      const data = await response.json();
      setData(data);
      console.log("🚀 ~ file: useFetchRedux.js:19 ~ getData ~ data", data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return [loaded, data]
}