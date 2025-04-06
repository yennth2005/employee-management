<div class="sidebar-wrapper">
    <div id="sidebarEffect"></div>
    <div>
        <div class="logo-wrapper logo-wrapper-center">
            <a href="{{ Route('admin.dashboard') }}" data-bs-original-title="" title="">
                <img class="img-fluid for-white" src="{{ asset('assets/admin/images/logo/full-white.png') }}"
                    alt="logo">
            </a>
            <div class="back-btn">
                <i class="fa fa-angle-left"></i>
            </div>
            <div class="toggle-sidebar">
                <i class="ri-apps-line status_toggle middle sidebar-toggle"></i>
            </div>
        </div>
        <div class="logo-icon-wrapper">
            <a href="index.html">
                <img class="img-fluid main-logo main-white" src="{{ asset('assets/admin/images/logo/logo.png') }}"
                    alt="logo">
                <img class="img-fluid main-logo main-dark" src="{{ asset('assets/admin/images/logo/logo-white.png') }}"
                    alt="logo">
            </a>
        </div>
        <nav class="sidebar-main">
            <div class="left-arrow" id="left-arrow">
                <i data-feather="arrow-left"></i>
            </div>

            <div id="sidebar-menu">
                <ul class="sidebar-links" id="simple-bar">
                    <li class="back-btn"></li>

                    <li class="sidebar-list">
                        <a class="sidebar-link sidebar-title link-nav" href="{{ Route('admin.dashboard') }}">
                            <i class="ri-home-line"></i>
                            <span>Trang quản trị</span>
                        </a>
                    </li>

                    <li class="sidebar-list">
                        <a class="linear-icon-link sidebar-link sidebar-title" href="#">
                            <i class="ri-store-3-line"></i>
                            <span>Sản phẩm</span>
                        </a>
                        <ul class="sidebar-submenu">
                            <li>
                                <a href="{{route('admin.products.index')}}">Danh sách sản phẩm</a>
                            </li>

                            <li>
                                <a href="add-new-product.html">Thêm sản phẩm</a>
                            </li>
                            <li>
                                <a href="add-new-product.html">Chỉnh sửa sản phẩm</a>
                            </li>
                        </ul>
                    </li>
                    {{-- danh mục --}}
                    <li class="sidebar-list">
                        <a class="linear-icon-link sidebar-link sidebar-title" href="#">
                            <i class="ri-list-check-2"></i>
                            <span>Danh mục</span>
                        </a>
                        <ul class="sidebar-submenu">
                            <li>
                                <a href="{{route('admin.categories.index')}}">Danh sách danh mục</a>
                            </li>

                            <li>
                                <a href="{{route('admin.categories.create')}}">Thêm mới</a>
                            </li>
                        </ul>
                    </li>
                    {{-- thuộc tính --}}
                    <li class="sidebar-list">
                        <a class="linear-icon-link sidebar-link sidebar-title" href="#">
                            <i class="ri-list-settings-line"></i>
                            <span>Thuộc tính</span>
                        </a>
                        <ul class="sidebar-submenu">
                            <li>
                                <a href="{{route('admin.colors.index')}}">Danh sách</a>
                            </li>

                            <li>
                                <a href="{{route('admin.colors.create')}}">Thêm mới</a>
                            </li>
                        </ul>
                    </li>
                    {{-- người dùng --}}
                    <li class="sidebar-list">
                        <a class="sidebar-link sidebar-title" href="#">
                            <i class="ri-user-3-line"></i>
                            <span>Người dùng</span>
                        </a>
                        <ul class="sidebar-submenu">
                            <li>
                                <a href="{{ Route('admin.user.index') }}">Tất cả người dùng</a>
                            </li>
                        </ul>
                    </li>

                    {{-- <li class="sidebar-list">
                        <a class="sidebar-link sidebar-title" href="javascript:void(0)">
                            <i class="ri-user-3-line"></i>
                            <span>Roles</span>
                        </a>
                        <ul class="sidebar-submenu">
                            <li>
                                <a href="role.html">All roles</a>
                            </li>
                            <li>
                                <a href="create-role.html">Create Role</a>
                            </li>
                        </ul>
                    </li>

                    <li class="sidebar-list">
                        <a class="sidebar-link sidebar-title link-nav" href="media.html">
                            <i class="ri-price-tag-3-line"></i>
                            <span>Media</span>
                        </a>
                    </li> --}}
                    {{-- đơn hàng --}}
                    <li class="sidebar-list">
                        <a class="sidebar-link sidebar-title" href="/admin/orders">
                            <i class="ri-archive-line"></i>
                            <span>Đơn hàng</span>
                        </a>
                        <ul class="sidebar-submenu">
                            <li>
                                <a href="order-list.html">Order List</a>
                            </li>
                            <li>
                                <a href="order-detail.html">Order Detail</a>
                            </li>
                            <li>
                                <a href="order-tracking.html">Order Tracking</a>
                            </li>
                        </ul>
                    </li>

                                        </ul>
            </div>

            <div class="right-arrow" id="right-arrow">
                <i data-feather="arrow-right"></i>
            </div>
        </nav>
    </div>
</div>
