package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.MapRanking;
import com.ssapin.backend.api.domain.entity.PlaceBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapRankingRepository extends JpaRepository<MapRanking, Long> {
}
