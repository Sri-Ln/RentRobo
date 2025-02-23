import "./styles.css";
import Error from "../../assets/NotFound/404.svg";
import Astronaut from "../../assets/NotFound/astronaut.svg";
import Moon from "../../assets/NotFound/moon.svg";
import Rocket from "../../assets/NotFound/rocket.svg";
import Earth from "../../assets/NotFound/earth.svg";
import { withRouter, WithRouterProps } from "../../utils/withRouter";

function NotFound(props: WithRouterProps) {
  return (
    <div>
      <div className="bg-purple">
        <div className="stars">
          <div className="central-body">
            <img className="image-404" src={Error} width="300px" alt="404" />
            <a
              onClick={() => props.navigate(-1)}
              className="btn-go-home"
              href="#"
            >
              GO BACK
            </a>
          </div>
          <div className="objects">
            <img className="object_rocket" src={Rocket} width="40px" alt="Rocket" />
            <div className="earth-moon">
              <img className="object_earth" src={Earth} width="100px" alt="Earth" />
              <img className="object_moon" src={Moon} width="80px" alt="Moon" />
            </div>
            <div className="box_astronaut">
              <img
                className="object_astronaut"
                src={Astronaut}
                width="140px"
                alt="Astronaut"
              />
            </div>
          </div>
          <div className="glowing_stars">
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(NotFound);
