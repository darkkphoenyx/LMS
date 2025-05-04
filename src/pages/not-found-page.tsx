import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card>
        <CardContent>
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold">Error 404: Not Found</h1>
            <p className="text-lg">
              The page you are looking for does not exist.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to={"/"}>
            <Button className="button2">Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFoundPage;
