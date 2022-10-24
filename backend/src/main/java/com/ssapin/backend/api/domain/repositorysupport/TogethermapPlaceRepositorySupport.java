package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.TogethermapPlace;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class TogethermapPlaceRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public TogethermapPlaceRepositorySupport(JPAQueryFactory queryFactory) {
        super(TogethermapPlace.class);
        this.queryFactory = queryFactory;
    }
}
