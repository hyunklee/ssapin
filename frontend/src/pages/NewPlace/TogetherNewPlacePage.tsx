/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import styled from "@emotion/styled";
import { AxiosError } from "axios";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
  forwardRef,
  LegacyRef,
} from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ReactComponent as PlusIcon } from "../../assets/svgs/plus.svg";

import { campusState } from "../../store/atom";
import { getTogetherMap } from "../../utils/apis/togethermapApi";
import {
  CAMPUS_COORDINATE_LIST,
  CAMPUS_LIST,
} from "../../utils/constants/contant";
import { addPlace } from "../../utils/functions/place";
import { IKakaoPlace } from "../../utils/types/place.interface";
import { ITogetherMap } from "../../utils/types/togethermap.interface";

const Conatiner = styled.section`
  position: relative;
`;

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 999;
  width: 378px;
  max-height: 80vh;
  ${(props) => props.theme.mq.tablet} {
    max-height: 50vh;
  }
  ${(props) => props.theme.mq.mobile} {
    right: 0;
    left: 0;
    top: 50vh;
    width: 90%;
    height: 50vh;
    margin: 0 auto;
  }
`;

const Form = styled.form`
  width: 100%;
  height: 83px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${(props) => props.theme.colors.lightBlue};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 251px;
  height: 43px;
  border-radius: 10px;
  border: none;
  margin-right: 10px;
  padding: 0 1rem;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.mainYellow};
  height: 43px;
  padding: 0 1rem;
`;

const SearchInformationContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  max-height: inherit;
  border-radius: 0 0 15px 15px;
  padding: 0 0.5rem 0.5rem 0.5rem;
  overflow-y: scroll;
  ${(props) => props.theme.mq.mobile} {
    height: calc(50vh - 83px);
  }
`;

const PaginationButton = styled.button`
  margin: 0 1rem;
`;

const { kakao } = window;
type Coordinate = [number, number];

export interface Pagination {
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  first: number;
  current: number;
  last: number;
  perPage: number;
  gotoFirst: () => void;
  gotoLast: () => void;
  gotoPage: (idx: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

function TogetherNewPlace() {
  const [keyword, setKeyword] = useState("");
  const [mapObj, setMapObj] = useState({
    map: null,
    ps: null,
    infowindow: null,
  });
  const [markerList, setMarkerList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [paginationList, setPaginationList] = useState([]);
  const mapRefs = useRef<HTMLDivElement>();
  const menuWrapRef = useRef<HTMLDivElement>();
  const pagenationRef = useRef<HTMLDivElement>();
  const itemRefs = useRef([]);
  const { togethermapId } = useParams();
  const userCampusId = useRecoilValue(campusState);
  const { data: togetherMapData } = useQuery<ITogetherMap, AxiosError>(
    ["together-map", togethermapId],
    () => getTogetherMap(Number(togethermapId)),
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const addMarker = (position: number, idx: number) => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691),
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
      offset: new kakao.maps.Point(13, 37),
    };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions,
    );
    const marker = new kakao.maps.Marker({
      position,
      image: markerImage,
    });
    marker.setMap(mapObj.map);
    return marker;
  };

  const displayInfoWindow = (marker: any, title: string) => {
    mapObj.infowindow?.setContent(
      `<div style="padding:10px;font-size:16px;width:150px;">${title}</div>`,
    );
    mapObj.infowindow?.open(mapObj.map, marker);
  };

  const displayPagination = (pagination: Pagination) => {
    const pageList = Array(Number(pagination.last))
      .fill(0)
      .map((_, i) => {
        return {
          number: i + 1,
          func: () => pagination.gotoPage(i + 1),
        };
      });
    setPaginationList(pageList);
  };
  const displayPlaces = (places: IKakaoPlace[]) => {
    const menuWrap = menuWrapRef.current;
    const bounds = new kakao.maps.LatLngBounds();
    // removeMarker();
    const newPlaceList = [];
    const newMarkerList: any[] = [];
    for (let i = 0; i < places.length; i++) {
      const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
      const marker = addMarker(placePosition, i);
      newMarkerList.push(marker);
      newPlaceList.push({ index: i, place: places[i] });
      bounds.extend(placePosition);
      ((mark, title) => {
        kakao.maps.event.addListener(mark, "mouseover", () => {
          displayInfoWindow(mark, title);
        });
        kakao.maps.event.addListener(mark, "mouseout", () => {
          mapObj.infowindow.close();
        });
      })(marker, places[i].place_name);
    }
    setMarkerList((prev) => {
      prev.forEach((marker) => marker.setMap(null));
      return newMarkerList;
    });
    setPlaceList(newPlaceList);
    menuWrap.scrollTop = 0;
    mapObj.map.setBounds(bounds);
  };

  const placesSearchCB = (
    data: IKakaoPlace[],
    status: string,
    pagination: Pagination,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
      displayPagination(pagination);
    }
  };

  const searchKeyword = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword) return;
    mapObj.ps?.keywordSearch(
      `${CAMPUS_LIST[togetherMapData.campusId]} ${keyword}`,
      placesSearchCB,
    );
  };

  useEffect(() => {
    const [lat, lan]: Coordinate = togetherMapData
      ? [
          +CAMPUS_COORDINATE_LIST[CAMPUS_LIST[Number(togetherMapData.campusId)]]
            .y,
          +CAMPUS_COORDINATE_LIST[CAMPUS_LIST[Number(togetherMapData.campusId)]]
            .x,
        ]
      : [
          +CAMPUS_COORDINATE_LIST[CAMPUS_LIST[userCampusId]].y,
          +CAMPUS_COORDINATE_LIST[CAMPUS_LIST[userCampusId]].x,
        ];
    const container = mapRefs.current;
    const options = {
      center: new kakao.maps.LatLng(lat, lan),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    setMapObj({ map, ps, infowindow });
  }, []);

  const mouseOver = (idx: number, title: string) => {
    displayInfoWindow(markerList[idx], title);
  };

  const mouseLeave = () => {
    mapObj.infowindow.close();
  };
  console.log(togethermapId);

  return (
    <Conatiner>
      <SearchContainer>
        <Form onSubmit={searchKeyword}>
          <div>
            <Input
              placeholder="Search Place..."
              onChange={onChange}
              value={keyword}
            />
            <SearchButton type="submit">검색</SearchButton>
          </div>
        </Form>
        <SearchInformationContainer ref={menuWrapRef}>
          <ul>
            {placeList?.map((place, idx) => (
              <PlaceCard
                {...place}
                key={place.index}
                ref={(el) => (itemRefs.current[idx] = el)}
                mouseOver={() => mouseOver(idx, place.place.place_name)}
                mouseLeave={mouseLeave}
                mapId={togethermapId}
              />
            ))}
          </ul>
          {paginationList.length ? (
            <div ref={pagenationRef}>
              {paginationList.map((page) => (
                <PaginationButton
                  type="button"
                  key={page.number}
                  onClick={page.func}
                >
                  {page.number}
                </PaginationButton>
              ))}
            </div>
          ) : null}
        </SearchInformationContainer>
      </SearchContainer>
      <MapContainer ref={mapRefs} />
    </Conatiner>
  );
}

export default TogetherNewPlace;

const List = styled.li`
  position: relative;
  border-bottom: 1px solid #888;
  cursor: pointer;
  min-height: 65px;
`;
const MarkerBg = styled.span<{ index: number }>`
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
    no-repeat;
  background-position: 0 ${(props) => -10 - props.index * 46}px;
`;

const PlaceInfoContainer = styled.div`
  padding: 10px 0 10px 55px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  h4 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: bold;
    margin-block-start: 1.67px;
    margin-block-end: 1.67px;
  }
  span {
    display: block;
    margin-top: 4px;
    &:last-of-type {
      color: #009900;
    }
  }
`;

const InfoInnerContainer = styled.div`
  position: relative;
`;

const CreateButton = styled.button`
  background-color: ${(props) => props.theme.colors.lightBlue};
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.gray0};
  transition: all 0.2s ease-in;
  align-items: center;
  display: flex;
  &:hover {
    transform: scale(1.03);
  }
  svg {
    display: block;
  }
`;

const Jibun = styled.span`
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
    no-repeat;
  color: ${(props) => props.theme.colors.gray400};
`;

interface PlaceCardProps {
  index: number;
  mouseOver: () => void;
  mouseLeave: () => void;
  place: IKakaoPlace;
  mapId: number;
}

const PlaceCard = forwardRef(
  (
    { index, place, mouseOver, mouseLeave, mapId }: PlaceCardProps,
    ref: LegacyRef<HTMLLIElement>,
  ) => {
    console.log(mapId);

    return (
      <List ref={ref} onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
        <MarkerBg index={index} />
        <PlaceInfoContainer>
          <InfoInnerContainer>
            <h4>{place.place_name}</h4>
            {place.road_address_name ? (
              <>
                <span>{place.road_address_name}</span>
                <Jibun>{place.address_name}</Jibun>
              </>
            ) : (
              <span>{place.address_name}</span>
            )}
            <span>{place.phone}</span>

            <CreateButton type="button" onClick={addPlace(place, mapId)}>
              장소
              <PlusIcon className="plus" />
            </CreateButton>
          </InfoInnerContainer>
        </PlaceInfoContainer>
      </List>
    );
  },
);
