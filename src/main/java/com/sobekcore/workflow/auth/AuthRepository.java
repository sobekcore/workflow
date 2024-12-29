package com.sobekcore.workflow.auth;

import com.sobekcore.workflow.auth.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface AuthRepository<T, ID> extends JpaRepository<T, ID> {
    Optional<T> findByUserAndId(User user, ID id);

    List<T> findAllByUser(User user);

    List<T> findAllByUserAndIdIn(User user, List<ID> ids);
}
