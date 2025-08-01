"""added img_url and published columns to models.Post

Revision ID: 03d2faabedb6
Revises: 4c2ca423a14d
Create Date: 2025-07-23 16:35:45.336337

"""

from collections.abc import Sequence
from typing import Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "03d2faabedb6"
down_revision: Union[str, Sequence[str], None] = "4c2ca423a14d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("posts", sa.Column("img_url", sa.String(), nullable=False, default="empty"))
    op.add_column("posts", sa.Column("published", sa.Boolean(), nullable=False, default="empty"))
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("posts", "published")
    op.drop_column("posts", "img_url")
    # ### end Alembic commands ###
